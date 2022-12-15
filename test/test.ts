import {expect} from 'chai';

describe('Top describe', function () {
    describe('Nested describe', function () {
        it('1', async () => {
            console.log('test 1');
        });

        it('2', async () => {
            console.log('test 2');
        });
    });
});

describe('Top skip describe', function () {
    describe('Nested describe', function () {
        it('1', async () => {
            expect(true).to.false;
        });

        it('2', async () => {
            console.log('test 2');
        });

        it('3', async () => {
            console.log('test 3');
        });

        it('4', async () => {
            throw new Error('Error');
        });

        it('5', async () => {
            console.log('test 5');
        });

        it('6', async () => {
            console.log('test 6');
        });

        it('7', async () => {
            console.log('test 7');
        });

        it('8', async () => {
            console.log('test 8');
        });
    });
});
