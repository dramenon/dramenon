var folderPath = Folder($.fileName).parent + "/images";
var csvFilePath = Folder($.fileName).parent + "/histogram_stats.csv";

var folder = new Folder(folderPath);
if (!folder.exists) {
  throw new Error("Folder not found: " + folderPath);
}

var fileList = folder.getFiles();
if (fileList.length === 0) {
  throw new Error("No files found in the folder");
}

var imageFiles = [];
for (var i = 0; i < fileList.length; i++) {
  var file = fileList[i];
  if (file instanceof File && /\.(jpg|jpeg|png|gif|bmp|psd|psb|tif|bmp)$/i.test(file.name)) {
    imageFiles.push(file);
  }
}

if (imageFiles.length < 2) {
  throw new Error("The folder must contain at least two image files.");
}

var statsArray = [];

for (var i = 0; i < imageFiles.length; i++) {
  try {
    var docRef = app.open(imageFiles[i]);
    if (!isRGBMode(docRef)) {
      alert("The image " + imageFiles[i].name + " is not in RGB mode and will be skipped.");
      docRef.close(SaveOptions.DONOTSAVECHANGES);
      continue;
    }
    var stats = getHistogramStats(docRef, imageFiles[i].name);
    statsArray.push(stats);
    docRef.close(SaveOptions.DONOTSAVECHANGES);
  } catch (e) {
    alert("Failed to open or process the image " + imageFiles[i].name + ": " + e.message);
  }
}

if (statsArray.length < 2) {
  throw new Error("Not enough RGB images to compare.");
}

var report = compareHistograms(statsArray[0], statsArray[1]);
alert(report);

writeStatsToCSV(csvFilePath, statsArray);

function isRGBMode(doc) {
  return doc.mode === DocumentMode.RGB;
}

function getHistogramStats(doc, fileName) {
  var stats = { fileName: fileName };
  var channels = ['Red', 'Green', 'Blue'];

  for (var i = 0; i < channels.length; i++) {
    try {
      var channel = doc.channels.getByName(channels[i]);
      var histo = channel.histogram;

      var totalPixels = 0;
      var sum = 0;
      var sumOfSquares = 0;
      var median = 0;
      var peak = 0;
      var entropy = 0;

      // Calculate mean, sum, sum of squares, and peak
      for (var j = 0; j < histo.length; j++) {
        totalPixels += histo[j];
        sum += j * histo[j];
        sumOfSquares += j * j * histo[j];
        if (histo[j] > peak) peak = histo[j];
      }

      var mean = sum / totalPixels;

      // Calculate standard deviation
      var variance = (sumOfSquares / totalPixels) - (mean * mean);
      var stdDev = Math.sqrt(variance);

      // Calculate median
      var cumulativePixels = 0;
      for (var j = 0; j < histo.length; j++) {
        cumulativePixels += histo[j];
        if (cumulativePixels >= totalPixels / 2) {
          median = j;
          break;
        }
      }

      // Calculate entropy
      for (var j = 0; j < histo.length; j++) {
        if (histo[j] > 0) {
          var p = histo[j] / totalPixels;
          entropy -= p * (Math.log(p) / Math.LN2); // Using Math.log(p) / Math.LN2 to calculate log base 2
        }
      }

      stats[channels[i]] = {
        mean: mean,
        stdDev: stdDev,
        median: median,
        peak: peak,
        entropy: entropy,
        totalPixels: totalPixels
      };
    } catch (e) {
      throw new Error("Failed to get stats for channel " + channels[i] + ": " + e.message);
    }
  }

  return stats;
}

function compareHistograms(stats1, stats2) {
  var channels = ['Red', 'Green', 'Blue'];
  var report = "";

  for (var i = 0; i < channels.length; i++) {
    var channel = channels[i];
    var meanDiff = stats1[channel].mean - stats2[channel].mean;
    var stdDevDiff = stats1[channel].stdDev - stats2[channel].stdDev;
    var medianDiff = stats1[channel].median - stats2[channel].median;
    var peakDiff = stats1[channel].peak - stats2[channel].peak;
    var entropyDiff = stats1[channel].entropy - stats2[channel].entropy;

    report += "Channel: " + channel + "\n";
    report += "Mean difference: " + meanDiff.toFixed(2) + "\n";
    report += "Standard Deviation difference: " + stdDevDiff.toFixed(2) + "\n";
    report += "Median difference: " + medianDiff + "\n";
    report += "Peak difference: " + peakDiff + "\n";
    report += "Entropy difference: " + entropyDiff.toFixed(2) + "\n\n";
  }

  return report;
}

function writeStatsToCSV(filePath, statsArray) {
  var file = new File(filePath);
  file.open('w');
  file.writeln("File Name,Channel,Mean,Standard Deviation,Median,Peak,Entropy,Total Pixels");

  for (var i = 0; i < statsArray.length; i++) {
    var stats = statsArray[i];
    for (var channel in stats) {
      if (channel !== 'fileName') {
        file.writeln(stats.fileName + "," + channel + "," + stats[channel].mean.toFixed(2) + "," + stats[channel].stdDev.toFixed(2) + "," + stats[channel].median + "," + stats[channel].peak + "," + stats[channel].entropy.toFixed(2) + "," + stats[channel].totalPixels);
      }
    }
    if (i < statsArray.length - 1) {
      file.writeln(""); // Add an empty line between results of different files
    }
  }

  file.close();
}
