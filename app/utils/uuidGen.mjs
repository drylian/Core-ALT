
import { v4 as uuidv4, v5 as uuidv5, NIL as nilUUID } from 'uuid';
import { json } from './json.mjs';
import configuractions from '../controllers/settings/Default.mjs';

// Gera um UUID v4 aleatorío
export function genv4(formated) {
    if (formated) {
        return uuidv4({ format: formated })
    }
    return uuidv4()
}

// Gera um UUID v5 baseado em um namespace e um nome
export function genv5(name, type) {
    const set = json(configuractions.configPATH + "/settings.json")
    return uuidv5(name, set.namespaces[type])
}

export function nill() { return nilUUID }
