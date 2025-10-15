import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { CheckInUseCase } from "./check-in";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "generated/prisma/runtime/library";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let checkInUseCase: CheckInUseCase;

describe("Check-in Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    checkInUseCase = new CheckInUseCase(checkInsRepository, gymsRepository);

    gymsRepository.items.push({
      id: "gym-1",
      title: "JavaScript Gym",
      description: "",
      phone: "",
      latitude: new Decimal(-22.2508386),
      longitude: new Decimal(-45.7230664),
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await checkInUseCase.execute({
      userId: "user-1",
      gymId: "gym-1",
      userLatitude: -22.2508386,
      userLongitude: -45.7230664,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2025, 9, 15, 8, 0, 0));

    await checkInUseCase.execute({
      userId: "user-1",
      gymId: "gym-1",
      userLatitude: -22.2508386,
      userLongitude: -45.7230664,
    });

    await expect(() =>
      checkInUseCase.execute({
        userId: "user-1",
        gymId: "gym-1",
        userLatitude: -22.2508386,
        userLongitude: -45.7230664,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2025, 9, 15, 8, 0, 0));

    await checkInUseCase.execute({
      userId: "user-1",
      gymId: "gym-1",
      userLatitude: -22.2508386,
      userLongitude: -45.7230664,
    });

    vi.setSystemTime(new Date(2025, 9, 16, 8, 0, 0));

    const { checkIn } = await checkInUseCase.execute({
      userId: "user-1",
      gymId: "gym-1",
      userLatitude: -22.2508386,
      userLongitude: -45.7230664,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in on distant gym", async () => {
    gymsRepository.items.push({
      id: "gym-2",
      title: "JavaScript Gym",
      description: "",
      phone: "",
      latitude: new Decimal(-22.161282),
      longitude: new Decimal(-45.7670975),
    });

    await expect(() =>
      checkInUseCase.execute({
        userId: "user-1",
        gymId: "gym-1",
        userLatitude: -22.2241257,
        userLongitude: -45.939283,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
