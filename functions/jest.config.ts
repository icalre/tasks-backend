import type {JestConfigWithTsJest} from 'ts-jest/dist/types';
import {jsWithTs as tsjPreset} from 'ts-jest/presets';

const config: JestConfigWithTsJest = {
    transform: {
        ...tsjPreset.transform,
    },
    modulePathIgnorePatterns: [".build"]
}

export default config;
