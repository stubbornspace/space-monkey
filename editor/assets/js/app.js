'us strict'

//Links
document.getElementById('live').href = exports.mediaLiveConsole;

function loadHls() {
	let player = videojs('video');
	player.src({
		src: hls_url,
		type: 'application/x-mpegURL'
	});
	player.play()
	document.getElementById('stream').innerHTML = 'Now Playing the HLS Stream';
}
