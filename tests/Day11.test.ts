import { partOne, partTwo } from "../days/Day10";

describe("Day 10", () => {
  describe("Part One", () => {
    it("returns the correct value for partOne", () => {
      const result = partOne("125 17");
      expect(result).toEqual(55312);
    });
    it("returns the correct value for partOne", () => {
      const result = partOne("0 5601550 3914 852 50706 68 6 645371");
      expect(result).toEqual(123456789);
    });
  });
});
