import { partOne, partTwo } from "../days/Day10";

describe("Day 10", () => {
  describe("Part One", () => {
    it("returns the correct value for partOne", () => {
      const result = partOne(
        "...0...\n...1...\n...2...\n6543456\n7.....7\n8.....8\n9.....9"
      );
      expect(result).toEqual(2);
    });
    it("returns the correct value for partOne", () => {
      const result = partOne(
        "..90..9\n...1.98\n...2..7\n6543456\n765.987\n876....\n987...."
      );
      expect(result).toEqual(4);
    });
    it("returns the correct value for partOne", () => {
      const result = partOne(
        "10..9..\n2...8..\n3...7..\n4567654\n...8..3\n...9..2\n.....01"
      );
      expect(result).toEqual(3);
    });
    it("returns the correct value for partOne", () => {
      const result = partOne(
        "89010123\n78121874\n87430965\n96549874\n45678903\n32019012\n01329801\n10456732"
      );
      expect(result).toEqual(36);
    });
  });

  describe.skip("Part Two", () => {
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
