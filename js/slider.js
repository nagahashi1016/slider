var data = {
    "house 1": 150,
    "house 2": 410,
    "house 4": 700,
    "house 14": 900,
    "house 3": 190,
    "house 15": 410,
    "house 4": 700,
    "house 5": 900,
    "house 6": 990,
    "house 7": 750,
    "house 8": 880,
    "house 9": 410,
    "house 10": 745,
    "house 11": 720,
    "house 12": 990,
    "house 13": 400,
    };

$(document).ready(function() {
const minPriceInput = $('#min-price');
const maxPriceInput = $('#max-price');
const priceRangeSlider = $('#price-range-slider');
const priceRangeLabels = $('#price-range-labels');

const initialMinPrice = 100;
const initialMaxPrice = 1000;
minPriceInput.val(initialMinPrice);
maxPriceInput.val(initialMaxPrice);

priceRangeSlider.slider({
    range: true,
    min: 100,
    max: 1000,
    values: [initialMinPrice, initialMaxPrice],
    slide: function(event, ui) {
    minPriceInput.val(ui.values[0]);
    maxPriceInput.val(ui.values[1]);

    priceRangeLabels.html(`その価格帯には ${getAvailabledata(ui.values[0], ui.values[1])} 部屋あります。`);

    showRoomList(ui.values[0], ui.values[1]);
    }
});

minPriceInput.on('change', function() {
    const minPrice = parseInt($(this).val());
    const maxPrice = parseInt(maxPriceInput.val());

    priceRangeSlider.slider('values', 0, minPrice);

    priceRangeLabels.html(`その価格帯には ${getAvailabledata(minPrice, maxPrice)}部屋あります。`);

    showRoomList(minPrice, maxPrice);
});

maxPriceInput.on('change', function() {
    const minPrice = parseInt(minPriceInput.val());
    const maxPrice = parseInt($(this).val());

    priceRangeSlider.slider('values', 1, maxPrice);

    priceRangeLabels.html(`その価格帯には ${getAvailabledata(minPrice, maxPrice)}部屋あります。`);

    showRoomList(minPrice, maxPrice);
});

function getAvailabledata(minPrice, maxPrice) {
    let count = 0;
    for (const room in data) {
    const price = data[room];
    if (price >= minPrice && price <= maxPrice) {
        count++;
    }
    }
    return count;
}

function showRoomList(minPrice, maxPrice) {
    const availableData = [];
    for (const room in data) {
    const price = data[room];
    if (price >= minPrice && price <= maxPrice) {
        availableData.push(room);
    }
    }
}
});