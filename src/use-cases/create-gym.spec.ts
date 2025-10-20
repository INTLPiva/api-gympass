import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { CreateGymUseCase } from "./create-gym";

let gymsRepository: InMemoryGymsRepository;
let createGymUseCase: CreateGymUseCase;

describe("Create Gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    createGymUseCase = new CreateGymUseCase(gymsRepository);
  });

  it("should to create gym", async () => {
    const { gym } = await createGymUseCase.execute({
      title: "JavaScript Gym",
      description: null,
      phone: null,
      latitude: -22.2508386,
      longitude: -45.7230664,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
