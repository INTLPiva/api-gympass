import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { CheckInUseCase } from "./check-in";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

let checkInsRepository: InMemoryCheckInsRepository;
let checkInUseCase: CheckInUseCase;

describe("Check-in Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    checkInUseCase = new CheckInUseCase(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await checkInUseCase.execute({
      userId: "user-1",
      gymId: "gym-1",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2025, 9, 15, 8, 0, 0));

    await checkInUseCase.execute({
      userId: "user-1",
      gymId: "gym-1",
    });

    await expect(() =>
      checkInUseCase.execute({
        userId: "user-1",
        gymId: "gym-1",
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2025, 9, 15, 8, 0, 0));

    await checkInUseCase.execute({
      userId: "user-1",
      gymId: "gym-1",
    });

    vi.setSystemTime(new Date(2025, 9, 16, 8, 0, 0));

    const { checkIn } = await checkInUseCase.execute({
      userId: "user-1",
      gymId: "gym-1",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
