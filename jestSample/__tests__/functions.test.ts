// todo: ここに単体テストを書いてみましょう！
import { sumOfArray, asyncSumOfArray } from "../functions";

describe("Jestで単体テストを書こう", () => {
    describe("sumOfArray", () => {
        test("[1, 1]を渡すと2が返ってくる", () => {

            // Act
            const result = sumOfArray([1, 1]);
            // Arrange
            expect(result).toBe(2);
        })

        test("空の配列を渡すと例外が送出される", () => {
            try {
                sumOfArray([])
            } catch (e) {
                expect(e).toBeInstanceOf(Error)
            }
        })

        test("[1]を渡すと1が返ってくる", () => {
            // Act
            const result = sumOfArray([1]);
            // Assert
            expect(result).toBe(1);
        })

        test("[-2, 2]を渡すと0が返ってくる", () => {
            // Act
            const result = sumOfArray([-2, 2]);
            // Assert
            expect(result).toBe(0);
        })

        test("[0.2, 0.1]を渡すと0.3が返ってくる", () => {
            // Act
            const result = sumOfArray([0.2, 0.1])
            // Assert
            // expect(result).toBe(0.3) // fails
            expect(result).toBeCloseTo(0.3)
        })
    })

    describe("asyncSumOfArray", () => {
        test("[1, 1]を渡すと2が返ってくる", async () => {
            // act
            const result = await asyncSumOfArray([1, 1]);
            // assert
            expect(result).toBe(2);
        })

        test("空の配列を渡すと例外が送出される", async () => {
            try {
                await asyncSumOfArray([])
            } catch (e) {
                expect(e).toBeInstanceOf(Error)
            }
        })

        test("[1]を渡すと1が返ってくる", async () => {
            // Act
            const result = await asyncSumOfArray([1]);
            // Assert
            expect(result).toBe(1);
        })

        test("[-2, 2]を渡すと0が返ってくる", async () => {
            // Act
            const result = await asyncSumOfArray([-2, 2]);
            // Assert
            expect(result).toBe(0);
        })

        test("[0.2, 0.1]を渡すと0.3が返ってくる", async () => {
            // Act
            const result = await asyncSumOfArray([0.2, 0.1])
            // Assert
            // expect(result).toBe(0.3) // fails
            expect(result).toBeCloseTo(0.3)
        })
    })
})