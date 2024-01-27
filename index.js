<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
    <script src="https://softvelum.com/player/releases/sldp-v2.17.5.min.js"></script>
  </head>
  <body>
    <div id="player"></div>

    <script type="text/javascript">
      document.addEventListener("DOMContentLoaded", initPlayer);

      function initPlayer(){
        sldpPlayer = SLDP.init({
          container:           'player',
          stream_url:          'wss://gcphkmgtm.vnkuvideo.com:8881//apps/13Z8iYf6DzV-ctGDrdPaTA/1706325833/fsd0112',
          adaptive_bitrate: {
            initial_rendition: '730p'
          },
          buffering:           500,
          autoplay:            true,
          width:               1240,
          height:              720,
        });
      };

      function removePlayer(){
        sldpPlayer.destroy(function () {
          console.log('SLDP Player is destroyed.');
        });
      }
    </script>
  </body>
</html>
