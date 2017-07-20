//common variable description

var Playingnumber = 0  ;
var shuffle=0;
var equal = 0;
var loop = 0;

// fancyTimeFormat use ki hai time ko seconds mein convert krnein k liye

function fancyTimeFormat(time) {
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

// play pause button banaya 

function toggleSong() {
    var song = document.querySelector('audio');
    if (song.paused == true) {
        console.log('Playing');
        $('.play-icon').removeClass('fa-play').addClass('fa-pause');
        song.play();
    } else {
        console.log('Pausing');
        $('.play-icon').removeClass('fa-pause').addClass('fa-play');
        song.pause();
    }
}


// hamare time ko starting of ending mein dene k liye yeh function lagaya

function updateCurrentTime() {
    var song = document.querySelector('audio');
    var currentTime = Math.floor(song.currentTime);
    currentTime = fancyTimeFormat(currentTime);
    var duration = Math.floor(song.duration);
    duration = fancyTimeFormat(duration)
    $('.time-elapsed').text(currentTime);
    $('.song-duration').text(duration);
}


// yeh hamara on load function hai jismein hmm apn login screen k baaad sedhe apnein music app wai screeen pe atte hain or jo extra functions diye hain vo saath mein load hote hain  

$('.welcome-screen button').on('click', function() {
    var name = $('#name-input').val();
    if (name.length > 2) {
        var message = "Welcome, " + name;
        $('.main .user-name').text(message);
        $('.welcome-screen').addClass('hidden');
        $('.main').removeClass('hidden');
    } else {
        $('#name-input').addClass('error');
    }
});
$('.play-icon').on('click', function() {
    toggleSong();
});
$('body').on('keypress', function(event) {
    if (event.keyCode == 32 && event.target.tagName !='INPUT') {
        toggleSong();

    }
});

// var songList = ['Tamma Tamma',
//     'Humma Song','Nashe si chad gayi','The Breakup Song'
// ];
//
// var fileNames = ['song1.mp3', 'song2.mp3', 'song3.mp3', 'song4.mp3'];
// var artistList = [' Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi','Badshah, Jubin Nautiyal, Shashaa Tirupati','Arijit Singh','Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi'];
// var albumList = ['Badrinath ki Dulhania','Ok Jaanu','Befikre','Ae Dil Hai Mushkil'];
// var durationList = ['2:56','3:15','2:34','2:29'];



//Hameney ek object banaya jismein hmne apna ek obect banaya or usmein apnein sare gaane rakhe



var songs = [{
        'name': 'Badri Ki Dulhania (Title Track)',
        'artist': 'Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi',
        'album': 'Badrinath ki Dulhania',
        'duration': '2:56',
        'fileName': 'song1.mp3',
        'image': 'song1.jpg'
    },
    {
        'name': 'Humma Song',
        'artist': 'Badshah, Jubin Nautiyal, Shashaa Tirupati',
        'album': 'Ok Jaanu',
        'duration': '3:15',
        'fileName': 'song2.mp3',
        'image': 'song2.jpg'
    },
    {
        'name': 'Nashe Si Chadh Gayi',
        'artist': 'Arijit Singh',
        'album': 'Befikre',
        'duration': '2:34',
        'fileName': 'song3.mp3',
        'image': 'song3.jpg'
    },
    {
        'name': 'The Breakup Song',
        'artist': 'Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi',
        'album': 'Ae Dil Hai Mushkil',
        'duration': '2:29',
        'fileName': 'song4.mp3',
        'image': 'song4.jpg'
    }
]


//progress bar banyi hmnein jo ganne k saath saath change hot

function updateTimer(){
var song = document.querySelector('audio');
var ct =song.currentTime;
var td =song.duration;
var percentage = (ct/td)*100;
$(".progress-filled").css('width',percentage+"%");



}

//hamein yeh ek or function banaya jismein jb hm progress bar pe jb bhi click kareinge vo change kregi
$(".player-progress").click(function(event) {
	console.log(event);
    var $this = $(this);
	console.log(this);

   
    var widthclicked = event.pageX - $this.offset().left;
    var totalWidth = $this.width(); 

        var calc = (widthclicked / totalWidth) * 100 ; 


var song = document.querySelector('audio');
song.currentTime = (song.duration*calc)/100;

updateTimer();



});









// hamenien ek function banaya jismein apna object daltein hain


function changeCurrentSongDetails(songObj) 
{
    $('.current-song-image').attr('src', 'img/' + songObj.image);
    $('.current-song-name').text(songObj.name);
    $('.current-song-album').text(songObj.album);
}

function addSongNameClickEvent(songObj, position) 
{

    var songName = songObj.fileName;
    var id = '#song' + position; //#song ke saath position ko jod do and agar position 1 hai to output #song1 hogi jisse id mein store kar diya
    $(id).click(function() 
        {
              Playingnumber= (position - 1)
            var audio = document.querySelector('audio');
            var currentSong = audio.src;
            if (currentSong.search(songName) != -1) {
                toggleSong();
            } else {
                audio.src = songName;
                toggleSong();
                changeCurrentSongDetails(songObj);
            }
        });
}


function changeSong() //we have made a machine jispe 2 buttons diye hai songName and position ke liye
{
var music =  songs[Playingnumber].fileName;
var song = document.querySelector("audio");
song.src = music;
toggleSong();
changeCurrentSongDetails(songs[Playingnumber])
}
window.onload = function() {



    changeCurrentSongDetails(songs[0]);

    for (var i = 0; i < songs.length; i++) //Var i zero se 3 tak chalana hai

    {
        var obj = songs[i]; //Diary ke andar se page utha ke humne obj variable mein store kar diya
        var name = '#song' + (i + 1);
        var song = $(name);
        song.find('.song-name').text(obj.name); //("song1 .songname")
        song.find('.song-artist').text(obj.artist);
        song.find('.song-album').text(obj.album);
        song.find('.song-length').text(obj.duration);
        addSongNameClickEvent(obj, i + 1);
    }
    updateCurrentTime();
    setInterval(function() {
        updateCurrentTime();
    }, 1000);

    setInterval(function() {
        updateTimer();
    }, 1000);



    $("#songs").DataTable({
        paging: false
    });
}

function randomExcluded(min, max, excluded) {
    var n = Math.floor(Math.random() * (max-min) + min);
    if (n >= excluded) n++;
    return n;
}


$(".fa-step-forward").click(function(){

if(shuffle==1)
{
      var audio = document.querySelector('audio');
      var nextSongNumber = randomExcluded(0,3,Playingnumber); // Calling our function from Stackoverflow

      var nextSongObj = songs[nextSongNumber];
      audio.src = nextSongObj.fileName;
      toggleSong();
      changeCurrentSongDetails(nextSongObj);
      Playingnumber = nextSongNumber;


}


else {

          if(Playingnumber == songs.length-1){
          Playingnumber = 0;
          changeSong();
          }

          else {
          console.log("two");
          console.log(Playingnumber);
            Playingnumber++;
          changeSong();
          }

}

})




$(".fa-step-backward").click(function(){

if(Playingnumber == 0){
console.log("one");
Playingnumber = (songs.length-1);
changeSong();




}

else {
console.log("two");
console.log(Playingnumber);
  Playingnumber--;
changeSong();
}




})

// function shufflee(a) {
//     var j, x, i;
//     for (i = a.length; i; i--) {
//         j = Math.floor(Math.random() * i);
//         x = a[i - 1];
//         a[i - 1] = a[j];
//         a[j] = x;
//     }
// }



$(".fa-random").click(function(){


$(".fa-random").toggleClass("active");
if(shuffle==0){

shuffle=1;
}
else {
  shuffle=0;
}
// if(shuffle==0)
// {
// shuffle = 1;
// shufflee(songs);
// changeCurrentSongDetails(songs[0]);
// song =document.querySelector("audio");
// song.src = songs[0].fileName;
// toggleSong();
// Playingnumber=0;
//
//     for (var i = 0; i < songs.length; i++) //Var i zero se 3 tak chalana hai
//
//     {
//         var obj = songs[i]; //Diary ke andar se page utha ke humne obj variable mein store kar diya
//         var name = '#song' + (i + 1);
//         var song = $(name);
//         song.find('.song-name').text(obj.name); //("song1 .songname")
//         song.find('.song-artist').text(obj.artist);
//         song.find('.song-album').text(obj.album);
//         song.find('.song-length').text(obj.duration);
//         addSongNameClickEvent(obj, i + 1);
//     }
// }

// else {
//   shuffle = 0;
//
//    songs = [{
//           'name': 'Badri Ki Dulhania (Title Track)',
//           'artist': 'Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi',
//           'album': 'Badrinath ki Dulhania',
//           'duration': '2:56',
//           'fileName': 'song1.mp3',
//           'image': 'song1.jpg'
//       },
//       {
//           'name': 'Humma Song',
//           'artist': 'Badshah, Jubin Nautiyal, Shashaa Tirupati',
//           'album': 'Ok Jaanu',
//           'duration': '3:15',
//           'fileName': 'song2.mp3',
//           'image': 'song2.jpg'
//       },
//       {
//           'name': 'Nashe Si Chadh Gayi',
//           'artist': 'Arijit Singh',
//           'album': 'Befikre',
//           'duration': '2:34',
//           'fileName': 'song3.mp3',
//           'image': 'song3.jpg'
//       },
//       {
//           'name': 'The Breakup Song',
//           'artist': 'Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi',
//           'album': 'Ae Dil Hai Mushkil',
//           'duration': '2:29',
//           'fileName': 'song4.mp3',
//           'image': 'song4.jpg'
//       }
//   ]
//
//   changeCurrentSongDetails(songs[0]);
//   song =document.querySelector("audio");
//   song.src = songs[0].fileName;
// toggleSong();
// Playingnumber=0;
//   for (var i = 0; i < songs.length; i++) //Var i zero se 3 tak chalana hai
//
//   {
//       var obj = songs[i]; //Diary ke andar se page utha ke humne obj variable mein store kar diya
//       var name = '#song' + (i + 1);
//       var song = $(name);
//       song.find('.song-name').text(obj.name); //("song1 .songname")
//       song.find('.song-artist').text(obj.artist);
//       song.find('.song-album').text(obj.album);
//       song.find('.song-length').text(obj.duration);
//       addSongNameClickEvent(obj, i + 1);
//   }
//
//
// }
//





})



$(".fa-repeat").click(function(){
$(".fa-repeat").toggleClass("active");
if(loop==0){

loop=1;

}
else{

loop=0;

}1


})

function randomExcluded(min, max, excluded) {
    var n = Math.floor(Math.random() * (max-min) + min);
    if (n >= excluded) n++;
    return n;
}



$('audio').on('ended',function() {
    var audio = document.querySelector('audio');
    if (shuffle == 1) {
            var nextSongNumber = randomExcluded(0,3,Playingnumber); // Calling our function from Stackoverflow
console.log(nextSongNumber);
            console.log(nextSongNumber);
            var nextSongObj = songs[nextSongNumber];
            audio.src = nextSongObj.fileName;
            toggleSong();
            changeCurrentSongDetails(nextSongObj);
            Playingnumber = nextSongNumber;

        }
    else if(Playingnumber < 3) {
  console.log("hello2");
        var nextSongObj = songs[Playingnumber+1];
        audio.src = nextSongObj.fileName; // Change Soure
        toggleSong(); // Play Next Song
        changeCurrentSongDetails(nextSongObj); // Update Image
        Playingnumber ++;// Change State
    }
    else if(loop == 1) {
  console.log("hello3");
         var nextSongObj = songs[0];
         audio.src = nextSongObj.fileName;
         toggleSong();
         changeCurrentSongDetails(nextSongObj);
         Playingnumber =  1;
     }
     else {
         $('.play-icon').removeClass('fa-pause').addClass('fa-play');
         audio.currentTime = 0;
     }
})


//   addSongNameClickEvent(fileNames[0],1);
// addSongNameClickEvent(fileNames[1],2);
// addSongNameClickEvent(fileNames[2],3);
// addSongNameClickEvent(fileNames[3],4);

$(".fa-microphone").hover(function(){

$("ol").css("display","inline-block")


})

$(".fa-microphone").mouseout(function(){

$("ol").css("display","none")


})