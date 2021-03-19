import { useState, useEffect } from "react";

const initState = { counters: [], wait: [], next: 1 };

const useBank = (names) => {
  const [bank, setBank] = useState(initState);

  useEffect(() => {
    for (const name of names) {
      const counter = { name, processting: null, processed: [] };
      setBank((bank) => ({ ...bank, counters: [...bank.counters, counter] }));
    }
    return () => setBank(initState);
  }, [names]);

  useEffect(() => {
    if (bank.wait.length) {
      work();
    }

    return () => clearTimeout(finishWork);
  }, [bank.wait, bank.counters]);

  const work = () => {
    for (const counter of bank.counters) {
      if (!counter.processting) {
        const currentNumber = bank.wait.shift();
        counter.processting = currentNumber;
        finishWork(counter);
        break;
      }
    }
    setBank((bank) => ({ ...bank, wait: bank.wait }));
  };

  const finishWork = (counter) => {
    const workTime = Math.round(Math.random() * (1500 - 500)) + 500;
    setTimeout(() => {
      counter.processed = [...counter.processed, counter.processting];
      counter.processting = null;
      setBank((bank) => ({
        ...bank,
        counters: bank.counters.map((worker) =>
          worker.name === counter.name ? counter : worker
        ),
      }));
    }, workTime);
  };

  const addClient = () => {
    const wait = [...bank.wait, bank.next];
    setBank((bank) => ({ ...bank, wait, next: bank.next++ }));
  };

  return [bank, addClient];
};

export default useBank;
