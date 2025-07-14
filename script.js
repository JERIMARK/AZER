// 🔊 Video fullscreen playback
const video = document.getElementById('myVideo');

function handleFullscreenChange() {
  if (
    document.fullscreenElement === video ||
    document.webkitFullscreenElement === video ||
    document.msFullscreenElement === video
  ) {
    video.play();
  }
}

document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('msfullscreenchange', handleFullscreenChange);

// 🔥 Firebase config (corrected)
const firebaseConfig = {
  apiKey: "AIzaSyBp9KG7ULrUOjgHv08EUXMiymTLgnTEAXs",
  authDomain: "website-67e76.firebaseapp.com",
  databaseURL: "https://website-67e76-default-rtdb.firebaseio.com",
  projectId: "website-67e76",
  storageBucket: "website-67e76.appspot.com", // ✅ fixed this line
  messagingSenderId: "808744367897",
  appId: "1:808744367897:web:4114141f7fb777a46cf788",
  measurementId: "G-8T6V7D0NNC"
};

// ✅ Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// 🔘 Like/Dislike Elements
const voteKey = 'votedType';
const likeEl = document.querySelector('[data-type="like"]');
const dislikeEl = document.querySelector('[data-type="dislike"]');

// 🔄 Sync vote counts from database
function syncCounts() {
  db.ref('votes').on('value', (snapshot) => {
    const data = snapshot.val() || {};
    likeEl.querySelector('.post-rating-count').textContent = data.like || 0;
    dislikeEl.querySelector('.post-rating-count').textContent = data.dislike || 0;

    const userVote = localStorage.getItem(voteKey);
    likeEl.classList.toggle('active', userVote === 'like');
    dislikeEl.classList.toggle('active', userVote === 'dislike');
  });
}

// 🗳 Vote function
function vote(type) {
  const currentVote = localStorage.getItem(voteKey);
  if (currentVote === type) return; // Already voted

  const opposite = type === 'like' ? 'dislike' : 'like';

  // Increment selected vote
  db.ref(`votes/${type}`).transaction(count => (count || 0) + 1);

  // Decrement previous vote
  if (currentVote === opposite) {
    db.ref(`votes/${opposite}`).transaction(count => Math.max((count || 1) - 1, 0));
  }

  // Save vote locally and update UI
  localStorage.setItem(voteKey, type);
  likeEl.classList.toggle('active', type === 'like');
  dislikeEl.classList.toggle('active', type === 'dislike');
}

// 🖱 Add click listeners
likeEl.addEventListener('click', () => vote('like'));
dislikeEl.addEventListener('click', () => vote('dislike'));

// 🔃 Start syncing from Firebase
syncCounts();
