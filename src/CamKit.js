/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable no-invalid-this */

'use strict';

/**
 * Handles:
 * - OBS start/kill
 * - Cam & light toggle
 * @module CamKit
 */
class CamKit { // eslint-disable-line
  #iftttToken;

  #ready = false;

  /**
   *
   */
  constructor() {
    try {
      let localStorageElement = localStorage['camKit'];

      if (!localStorageElement) {
        console.warn("camKit.iftttToken not configured in local storage. CamKit is disabled: no OBS, no cam & light handling.")
        return;
      }

      const config = JSON.parse(localStorageElement);
      // noinspection JSUnresolvedVariable
      this.#iftttToken = config.iftttToken;

      if (!this.#iftttToken) {
        console.warn("camKit.iftttToken not configured in local storage. CamKit is disabled: no OBS, no cam & light handling.")
        return;
      }
      this.#ready = true;
    } catch (ex) {
      console.error("Parsing error")
    }
  }

  /**
   * Reports whether the Hue Lights API is available.
   *
   * @return {boolean}
   */
  get isAvailable() {
    return this.#ready;
  }

  /**
   * Delay for a promise
   * @param {number} ms delay in ms
   * @return {Promise<unknown>}
   */
  wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * @param {boolean} on state
   */
  async on(on) {
    if (!this.#ready) {
      return;
    }
    const localApiUrl = `http://localhost:6780/?action=${(on ? 'start-cam-kit' : 'stop-cam-kit')}`;
    await fetch(localApiUrl, {method: 'GET', mode: 'no-cors'});
  }
}
