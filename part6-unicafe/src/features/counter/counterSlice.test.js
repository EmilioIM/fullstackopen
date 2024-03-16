import deepFreeze from 'deep-freeze';
import { good, ok, bad, reset, default as counterReducer } from './counterSlice';

describe('counter slice', () => {
  it('should handle bad', () => {
    const initialState = {
      good: 0,
      ok: 0,
      bad: 0,
    };
    const action = bad();
    const finalState = {
      good: 0,
      ok: 0,
      bad: 1,
    };

    deepFreeze(initialState); // Aseguramos que el estado antes no se modifique
    deepFreeze(action); // Aseguramos que la acción no se modifique

    expect(counterReducer(initialState, action)).toEqual(finalState);
  });

  it('should handle neutral', () => {
    const initialState = {
      good: 0,
      ok: 0,
      bad: 0,
    };
    const action = ok();
    const finalState = {
      good: 0,
      ok: 1,
      bad: 0,
    };

    deepFreeze(initialState); // Aseguramos que el estado antes no se modifique
    deepFreeze(action); // Aseguramos que la acción no se modifique

    expect(counterReducer(initialState, action)).toEqual(finalState);
  });

  it('should handle good', () => {
    const initialState = {
      good: 0,
      ok: 0,
      bad: 0,
    };
    const action = good();
    const finalState = {
      good: 1,
      ok: 0,
      bad: 0,
    };

    deepFreeze(initialState); // Aseguramos que el estado antes no se modifique
    deepFreeze(action); // Aseguramos que la acción no se modifique

    expect(counterReducer(initialState, action)).toEqual(finalState);
  });

  it('should handle reset', () => {
    const initialState = {
      good: 10,
      ok: 10,
      bad: 10,
    };
    const action = reset();
    const finalState = {
      good: 0,
      ok: 0,
      bad: 0,
    };

    deepFreeze(initialState); // Aseguramos que el estado antes no se modifique
    deepFreeze(action); // Aseguramos que la acción no se modifique

    expect(counterReducer(initialState, action)).toEqual(finalState);
  });
});