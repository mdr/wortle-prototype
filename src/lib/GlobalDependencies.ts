import { createOptionalContext, useService } from "@/utils/providerish/serviceHooks"

import { type Clock } from "./Clock"
import { type StatsStorage } from "./StatsStorage"

export interface GlobalDependencies {
  clock: Clock
  statsStorage: StatsStorage
}

export const GlobalDependenciesContext = createOptionalContext<GlobalDependencies>()

export const useGlobalDependencies = (): GlobalDependencies => useService(GlobalDependenciesContext)

export const useClock = (): Clock => useGlobalDependencies().clock

export const useStatsStorage = (): StatsStorage => useGlobalDependencies().statsStorage
