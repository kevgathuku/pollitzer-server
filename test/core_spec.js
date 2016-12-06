import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

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

  describe('vote', () => {

   it('creates a tally for the voted entry', () => {
     const state = Map({
       vote: Map({
         pair: List.of('Trainspotting', '28 Days Later')
       }),
       entries: List()
     });
     const nextState = vote(state, 'Trainspotting');
     expect(nextState).to.equal(Map({
       vote: Map({
         pair: List.of('Trainspotting', '28 Days Later'),
         tally: Map({
           'Trainspotting': 1
         })
       }),
       entries: List()
     }));
   });

   it('adds to existing tally for the voted entry', () => {
     const state = Map({
       vote: Map({
         pair: List.of('Trainspotting', '28 Days Later'),
         tally: Map({
           'Trainspotting': 3,
           '28 Days Later': 2
         })
       }),
       entries: List()
     });
     const nextState = vote(state, 'Trainspotting');
     expect(nextState).to.equal(Map({
       vote: Map({
         pair: List.of('Trainspotting', '28 Days Later'),
         tally: Map({
           'Trainspotting': 4,
           '28 Days Later': 2
         })
       }),
       entries: List()
     }));
   });

 });
});
