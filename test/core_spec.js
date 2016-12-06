import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next} from '../src/core';

describe('application logic', () => {

  describe('setEntries', () => {
     it('adds the entries to the state', () => {
       const intialState = Map();
       const entries = List.of('Trainspotting', '28 Days Later');
       const nextState = setEntries(intialState, entries);

       expect(nextState).to.equal(Map({
        entries: List.of('Trainspotting', '28 Days Later')
      }));
     });

     it('converts entries to immutable', () => {
       const intialState = Map();
       const entries = ['Trainspotting', '28 Days Later'];
       const nextState = setEntries(intialState, entries);

       expect(nextState).to.equal(Map({
        entries: List.of('Trainspotting', '28 Days Later')
      }));
     });
  });

  describe('next', () => {
    it('puts the next 2 entries under vote', () => {
      const state = Map({
       entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
     });
      const nextState = next(state);
      // The first 2 entries are removed from entries and put into the vote key
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later')
        }),
        entries: List.of('Sunshine')
      }));
    });
  });
});
