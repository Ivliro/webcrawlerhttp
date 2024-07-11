import { test,expect } from "@jest/globals";
import { sortPages } from "./report.js";

test("sortPages 2 pages", () => {
    const input = {
        'https://wagslane.dev': 3,
        'https://wagslane.dev/path': 1,
    }
    const actual = sortPages(input)
    const expected = [
        ['https://wagslane.dev', 3],
        ['https://wagslane.dev/path', 1],
    ]
    expect(actual).toEqual(expected)
});

test("sortPages 4 pages", () => {
    const input = {
        'https://wagslane.dev': 7,
        'https://wagslane.dev/path': 3,
        'https://wagslane.dev/path2': 1,
        'https://wagslane.dev/path3': 9,
    }
    const actual = sortPages(input)
    const expected = [
        ['https://wagslane.dev/path3', 9],
        ['https://wagslane.dev', 7],
        ['https://wagslane.dev/path', 3],
        ['https://wagslane.dev/path2', 1],
    ]
    expect(actual).toEqual(expected)
});