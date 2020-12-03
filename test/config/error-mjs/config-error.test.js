'use strict';
const { resolve } = require('path');
const { run } = require('../../utils/test-utils');

describe('config error', () => {
    it('should throw error with invalid configuration', () => {
        const { exitCode, stderr, stdout } = run(__dirname, ['-c', resolve(__dirname, 'webpack.config.mjs')], false, [], {
            DISABLE_V8_COMPILE_CACHE: true,
        });

        if (/^v[1-9][2-9]/.test(process.version)) {
            expect(exitCode).toBe(2);
            expect(stderr).toContain('Invalid configuration object');
            expect(stderr).toContain(`"development" | "production" | "none"`);
            expect(stdout).toBeFalsy();
        } else {
            expect(exitCode).toBe(2);
            expect(stderr).toContain('Unexpected token export');
            expect(stdout).toBeFalsy();
        }
    });

    it('should throw syntax error and exit with non-zero exit code', () => {
        const { exitCode, stderr, stdout } = run(__dirname, ['-c', resolve(__dirname, 'syntax-error.mjs')], false, [], {
            DISABLE_V8_COMPILE_CACHE: true,
        });

        expect(exitCode).toBe(2);
        expect(stderr).toContain('SyntaxError: Unexpected token');
        expect(stdout).toBeFalsy();
    });
});