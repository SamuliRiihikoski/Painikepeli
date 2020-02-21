<template>
  <div id="app">
    <h1>Painikepeli</h1>
    <h2>Pisteesi: {{PlayerScore}}</h2>
    <button v-if="PlayerScore==0" @click="NewGameButton()">Hävisit! Pelaa uudelleen.</button>
    <button v-else @click="ButtonPressed()">Pelaa!</button>
    <h4>Seuraava voitto on {{NextWinCount}} painalluksen päässä.</h4>
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @enter-cancelled="enterCancelled"
      
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
      @leave-cancelled="leaveCancelled"
      :css="false">
        <h4 v-if="Show">{{Text}}</h4>
    </transition>
  </div>
</template>

<script>
import db from './firebase/init'

export default {
  name: 'app',
  data () {
    return {
      PlayerScore: 20,
      Counter: 0,
      NextWinCount: null,
      Show: false,
      Text: ''
    }
  },
  methods: {
    ButtonPressed() {
      let ref = db.collection('counter').doc('counter');
      this.Counter += 1;

      // Add points into players score

      if(this.Counter % 500 == 0) {
        this.PlayerScore += 250;
        this.Text = 'Onneksi olkoon! Voitit 250 pistettä.';
        this.Show = true;
      }
      else if(this.Counter % 100 == 0) {
        this.PlayerScore += 40;
        this.Text = 'Onneksi olkoon! Voitit 40 pistettä.';
        this.Show = true;
      }
      else if(this.Counter % 10 == 0) {
        this.PlayerScore += 5;
        this.Text = 'Onneksi olkoon! Voitit 5 pistettä.';
        this.Show = true;
      }
      
      
      // reset counter if value 500
      if(this.Counter >=500)
        this.Counter = 0;

      ref.set({
        counter: this.Counter
        }, { merge:true });
      this.PlayerScore -= 1;

    },
    NewGameButton() {
      this.PlayerScore = 20;
    },

    // Text Animation

    beforeEnter(el) {
      el.style.opacity = 0.0;

    },
    enter(el, done) {
      let round = 0.02;
      const interval = setInterval(() => {
        el.style.opacity = round; 
        round += 0.02;
        if(round >= 1) {
          clearInterval(interval);
          done();
        }
      }, 20);
    },
    afterEnter(el) {
      this.Show = false;
    },
    enterCancelled(el) {
    },
    beforeLeave(el) {
      el.style.opacity = 1.0;
    },
    leave(el, done) {
      let round = 1.0;
      const interval = setInterval(() => {
        el.style.opacity = round; 
        round -= 0.02;
        if(round <= 0.0) {
          clearInterval(interval);
          done();
        }
      }, 20);
    },
    afterLeave(el) {
    },
    leaveCancelled(el) {
    }
  },
  created() {
    // fetch Counter data from firestore
    let ref = db.collection('counter').doc('counter');
    ref.get().then(value => {
      let storedData = value.data();
      this.Counter = storedData.counter;
      this.NextWinCount = 10 - (this.Counter % 10);
    })

    // Let's add Firestore event listerner
    ref.onSnapshot(value => {
      let storedData = value.data();
      this.Counter = storedData.counter;
      this.NextWinCount = 10 - (this.Counter % 10);
    })
  },
  mounted() {
    if (localStorage.PlayerScore) {
      this.PlayerScore = localStorage.PlayerScore;
    }
  },
  watch: {
    PlayerScore(newScore) {
      localStorage.PlayerScore = newScore;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

</style>
