/* eslint-disable no-prototype-builtins */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type SetSettingAction = {
  setting: keyof SettingsState,
  value: SettingsState[keyof SettingsState],
};

interface SettingsState {
  temperatureUnit: 'c' | 'f',
  windUnit: 'kph' | 'mph',
  pressureUnit: 'mb' | 'psi',
  distanceUnit: 'km' | 'miles'
  isTimeFormat12hrs: boolean;
}

const initialState: SettingsState = {
  temperatureUnit: 'c',
  windUnit: 'kph',
  pressureUnit: 'mb',
  distanceUnit: 'km',
  isTimeFormat12hrs: true,
};

export const counterSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSetting(state, { payload }: PayloadAction<SetSettingAction>) {
      if (state.hasOwnProperty(payload.setting)) {
        state = {
          ...state,
          [payload.setting]: payload.value,
        };
      }
    },
  },
});

export const { actions } = counterSlice;

export default counterSlice.reducer;
