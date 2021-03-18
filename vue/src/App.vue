<template>
  <div id="app">
    <table>
      <thead>
        <tr>
          <th>Counter</th>
          <th>Processting</th>
          <th>Processed</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="counter in counters" :key="counter.name">
          <td>{{ counter.name }}</td>
          <td>{{ counter.processting || "idle" }}</td>
          <td>{{ counter.processed.join(",") }}</td>
        </tr>
      </tbody>
    </table>
    <div>
      <span>Waitring: {{ wait.length }}</span>
      <button v-on:click="addNext">Next: {{ next }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      names: [
        "Kareem Abdul-Jabbar",
        "Karl Malone",
        "LeBron James",
        "Kobe Bryant",
        "Michael Jordan",
      ],
      counters: [],
      wait: [],
      next: 1,
    };
  },
  created() {
    for (const name of this.names) {
      const counter = { name, processting: null, processed: [] };
      this.counters.push(counter);
    }
  },
  methods: {
    addNext() {
      this.wait.push(this.next);
      for (const counter of this.counters) {
        if (!counter.processting) {
          counter.processting = this.wait.shift();
          this.work(counter);
          break;
        }
      }
      this.next++;
    },
    work(counter) {
      const workTime = Math.round(Math.random() * (1500 - 500)) + 500;
      setTimeout(() => {
        counter.processed.push(counter.processting);
        if (this.wait.length) {
          counter.processting = this.wait.shift();
          this.work(counter);
        } else {
          counter.processting = null;
        }
      }, workTime);
    },
  },
};
</script>

<style>
body {
  margin: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3e9d2;
}
#app {
  max-width: 900px;
  width: 100%;
}
table {
  width: 100%;
  margin-bottom: 20px;
}
thead {
  background-color: #114b5f;
  color: #c6dabf;
}
tbody {
  background-color: #f5f5f5;
}
th,
td {
  padding: 10px;
  height: 30px;
  width: calc(100% / 3);
}
#app div {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
span {
  color: #e16f7c;
}
button {
  background-color: #1a936f;
  color: #c6dabf;
  border: 0;
  border-radius: 3px;
  padding: 10px;
  cursor: pointer;
  outline: none;
}
</style>
