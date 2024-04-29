// İşaretçi ekleme işlevi
function addMarker(event) {
    var message = document.getElementById('message').value;
    var dot = document.createElement('div');
    dot.className = 'dot';

    // İşaretçi pozisyonunu hesaplama
    var map = document.getElementById('map');
    var rect = map.getBoundingClientRect();
    var x = event.clientX - rect.left - 5; // Nokta merkezini ayarlamak için 5px çıkarıyoruz
    var y = event.clientY - rect.top - 5;

    dot.style.left = x + 'px';
    dot.style.top = y + 'px';

    map.appendChild(dot);

    // Nokta için not ekleme
    var note = document.createElement('div');
    note.className = 'note';
    note.innerHTML = message;
    dot.appendChild(note);

    // Açıklama ve zamanlayıcı panelini güncelle
    var infoPanel = document.getElementById('markers');
    var markerItem = document.createElement('li');
    markerItem.innerHTML = message;
    infoPanel.appendChild(markerItem);

    // Zamanlayıcı başlatma (örneğin 3 saat)
    var countdown = 3 * 60 * 60; // 3 saat
    var timerDisplay = document.createElement('span');
    timerDisplay.innerText = ' - ' + formatTime(countdown);
    markerItem.appendChild(timerDisplay);

    var timerInterval = setInterval(function() {
        countdown--;

        if (countdown < 0) {
            clearInterval(timerInterval);
            dot.style.display = 'none'; // İşaretçiyi gizleme
            markerItem.remove(); // Açıklama ve zamanlayıcıyı kaldırma
        } else {
            timerDisplay.innerText = ' - ' + formatTime(countdown);
        }
    }, 1000);

    // Noktaya tıklandığında notu gösterme ve silme
    dot.addEventListener('click', function() {
        alert(message);
        dot.remove(); // İşaretçiyi silme
        markerItem.remove(); // Açıklama ve zamanlayıcıyı kaldırma
    });

    // "Kaldır" butonu ekleme
    var removeButton = document.createElement('button');
    removeButton.innerText = 'Remove';
    removeButton.addEventListener('click', function() {
        dot.remove(); // İşaretçiyi silme
        markerItem.remove(); // Açıklama ve zamanlayıcıyı kaldırma
        clearInterval(timerInterval); // Zamanlayıcıyı durdurma
    });
    markerItem.appendChild(removeButton);

    // Açıklama kısmına mouse ile gelindiğinde sarı kare oluştur
    markerItem.addEventListener('mouseover', function() {
        dot.classList.add('highlight');
    });

    // Açıklama kısmından mouse çekildiğinde sarı kareyi kaldır
    markerItem.addEventListener('mouseout', function() {
        dot.classList.remove('highlight');
    });
}

// Tüm işaretlemeleri kaldırma işlevi
function removeAllMarkers() {
    var map = document.getElementById('map');
    var markers = map.getElementsByClassName('dot');
    while (markers[0]) {
        markers[0].parentNode.removeChild(markers[0]);
    }

    var infoPanel = document.getElementById('markers');
    infoPanel.innerHTML = ''; // Açıklama ve zamanlayıcıları temizle
}

// Son işareti kaldırma işlevi
function removeLastMarker() {
    var map = document.getElementById('map');
    var markers = map.getElementsByClassName('dot');
    if (markers.length > 0) {
        markers[markers.length - 1].parentNode.removeChild(markers[markers.length - 1]);
    }

    var infoPanel = document.getElementById('markers');
    var lastMarker = infoPanel.lastChild;
    if (lastMarker) {
        lastMarker.remove(); // Açıklama ve zamanlayıcıyı kaldır
    }
}

// Zaman biçimini formatlama işlevi
function formatTime(seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var secs = seconds % 60;
    return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + secs.toString().padStart(2, '0');
}

// Haritaya tıklama olayını dinleme
document.getElementById('map').addEventListener('click', addMarker);
