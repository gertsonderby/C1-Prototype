import unexpected from 'unexpected';
let expect = unexpected.clone();

describe('this is a test', () => {
    it('will succeed', () => {
        return expect(1, 'to be', 1);
    });

    it('will fail', () => {
        return expect(1, 'to be', 2);
    });
});
