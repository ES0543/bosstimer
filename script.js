function addMarker(event) {
    var message = document.getElementById('message').value;
    var dot = document.createElement('div');
    dot.className = 'dot';

    var map = document.getElementById('map');
    var rect = map.getBoundingClientRect();
    var x = event.clientX - rect.left - 5;
    var y = event.clientY - rect.top - 5;

    dot.style.left = x + 'px';
    dot.style.top = y + 'px';

    map.appendChild(dot);

    var note = document.createElement('div');
    note.className = 'note';
    note.innerHTML = message;
    dot.appendChild(note);

    var infoPanel = document.getElementById('markers');
    var markerItem = document.createElement('li');
    markerItem.innerHTML = message;
    infoPanel.appendChild(markerItem);

    var countdown = 3 * 60 * 60;
    var timerDisplay = document.createElement('span');
    timerDisplay.innerText = ' - ' + formatTime(countdown);
    markerItem.appendChild(timerDisplay);

    var timerInterval = setInterval(function() {
        countdown--;

        if (countdown < 0) {
            clearInterval(timerInterval);
            dot.style.display = 'none';
            markerItem.remove();
        } else {
            timerDisplay.innerText = ' - ' + formatTime(countdown);
        }
    }, 1000);

    dot.addEventListener('click', function() {
        alert(message);
        dot.remove();
        markerItem.remove();
    });

    var removeButton = document.createElement('button');
    removeButton.innerText = 'Remove';
    removeButton.addEventListener('click', function() {
        dot.remove();
        markerItem.remove();
        clearInterval(timerInterval);
    });
    markerItem.appendChild(removeButton);

    markerItem.addEventListener('mouseover', function() {
        dot.classList.add('highlight');
    });

    markerItem.addEventListener('mouseout', function() {
        dot.classList.remove('highlight');
    });
}

function removeAllMarkers() {
    var map = document.getElementById('map');
    var markers = map.getElementsByClassName('dot');
    while (markers[0]) {
        markers[0].parentNode.removeChild(markers[0]);
    }

    var infoPanel = document.getElementById('markers');
    infoPanel.innerHTML = '';
}

function removeLastMarker() {
    var map = document.getElementById('map');
    var markers = map.getElementsByClassName('dot');
    if (markers.length > 0) {
        markers[markers.length - 1].parentNode.removeChild(markers[markers.length - 1]);
    }

    var infoPanel = document.getElementById('markers');
    var lastMarker = infoPanel.lastChild;
    if (lastMarker) {
        lastMarker.remove();
    }
}

function formatTime(seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var secs = seconds % 60;
    return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + secs.toString().padStart(2, '0');
}

document.getElementById('map').addEventListener('click', addMarker);


