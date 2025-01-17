import { partOne, partTwo } from "../days/Day9";

describe("Day 9", () => {
  describe("Part One", () => {
    it("returns the correct value for partOne", () => {
      const result = partOne("2333133121414131402");
      expect(result).toEqual(1928);
    });
  });

  describe("Part Two", () => {
    it("returns the correct value for partTwo", () => {
      const result = partTwo("29702");
      expect(result).toEqual(59);
    });
    it("returns the correct value for partTwo", () => {
      const result = partTwo("1313165");
      expect(result).toEqual(169);
    });

    it("returns the correct value for partTwo", () => {
      const result = partTwo("2333133121414131402");
      expect(result).toEqual(2858);
    });
    it("returns the correct value for partTwo", () => {
      const result = partTwo("9953877292941");
      expect(result).toEqual(5768);
    });
  });
});
