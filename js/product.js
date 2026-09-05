/* Product detail page logic — ported from the 9 category templates
   (layouts/light/<Category>/single.html). Modes:
   - grid:     every model gets With Frame / Frameless options; image is
               `${series}-${model}${suffix}.webp`; voltage is a static row.
   - recessed: frameless only for models flagged hasFrameless; image is
               `${code}${suffix}.webp`; BD3010 frameless uses dimensionsA/cutoutA.
   - default:  one option per model labeled by product code; image from specs.image.
*/
function initProductPage(cfg) {
  var catData = window.PRODUCT_DATA && window.PRODUCT_DATA[cfg.category];
  if (!catData) return;

  var series = cfg.series;
  if (!catData.specs[series]) {
    // Sub-model pages (e.g. "OD3004-70") belong to a series keyed without the
    // suffix ("OD3004"): pick the longest matching prefix, else the category fallback.
    var keys = Object.keys(catData.specs);
    var best = null;
    keys.forEach(function (key) {
      if (series.indexOf(key) === 0 && (!best || key.length > best.length)) best = key;
    });
    series = best || catData.fallback;
  }
  var specs = catData.specs[series];
  var models = Object.keys(specs);
  var dir = cfg.dir;

  var currentModel = models[0];
  var currentFrame = 'with';
  var select = document.getElementById('modelSelect');

  function setText(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function isFramelessSeries() {
    return series === 'BD3002' || series === 'BD3006' || series === 'BD3010';
  }

  function buildOptions() {
    select.innerHTML = '';
    models.forEach(function (model) {
      var s = specs[model];
      if (cfg.mode === 'grid') {
        var withFrame = document.createElement('option');
        withFrame.value = model + '-with';
        withFrame.textContent = series + '-' + model + ' (With Frame)';
        select.appendChild(withFrame);

        var frameless = document.createElement('option');
        frameless.value = model + '-without';
        frameless.textContent = series + '-' + model + ' (Frameless)';
        select.appendChild(frameless);
      } else if (cfg.mode === 'recessed' && isFramelessSeries() && s.hasFrameless) {
        var withFrame = document.createElement('option');
        withFrame.value = model + '-with';
        withFrame.textContent = s.code + ' (With Frame)';
        select.appendChild(withFrame);

        var frameless = document.createElement('option');
        frameless.value = model + '-without';
        frameless.textContent = s.code + 'A (Frameless)';
        select.appendChild(frameless);
      } else {
        var option = document.createElement('option');
        option.value = model;
        option.textContent = s.code;
        select.appendChild(option);
      }
    });
  }

  function updateDisplay() {
    var s = specs[currentModel];
    var frameSuffix = currentFrame === 'without' ? 'A' : '';
    var imagePath;

    if (cfg.mode === 'grid') {
      imagePath = dir + '/' + series + '-' + currentModel + frameSuffix + '.webp';
    } else if (cfg.mode === 'recessed') {
      var imageExtension = s.image.split('.').pop();
      imagePath = dir + '/' + s.code + frameSuffix + '.' + imageExtension;
    } else {
      imagePath = dir + '/' + s.image;
    }

    var img = document.getElementById('mainImage');
    if (img) img.src = imagePath;

    setText('spec-code', cfg.mode === 'default' ? s.code : s.code + frameSuffix);
    setText('spec-voltage', s.voltage);
    setText('spec-power', s.power);
    setText('spec-dimensions', s.dimensions);
    setText('spec-cutout', s.cutout);
    setText('spec-angle', s.angle);

    // BD3010 frameless version has different body dimensions and cutout
    if (series === 'BD3010' && currentFrame === 'without') {
      setText('spec-dimensions', s.dimensionsA || s.dimensions);
      setText('spec-cutout', s.cutoutA || s.cutout);
    }
  }

  select.addEventListener('change', function () {
    var value = this.value;
    if (value.indexOf('-with') !== -1) {
      var parts = value.split('-');
      currentModel = parts[0];
      currentFrame = parts[1];
    } else {
      currentModel = value;
      currentFrame = 'with';
    }
    updateDisplay();
  });

  buildOptions();
  updateDisplay();
}
