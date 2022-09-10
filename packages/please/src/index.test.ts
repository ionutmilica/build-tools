describe('Test the build tools', () => {
  describe('Basic test', () => {
    test('should support basic assertion', () => {
      let value: number;
      let expected: number;
      value = 2;
      expected = 2;
      expect(value).toEqual(expected);
      value = 2;
      expected = 3;
      expect(value).not.toEqual(expected);
    });
  });
});
