import PocketBase from 'pocketbase'
import { writable } from 'svelte/store'

// create a connection to the database
export const pb = new PocketBase('http://127.0.0.1:8090')