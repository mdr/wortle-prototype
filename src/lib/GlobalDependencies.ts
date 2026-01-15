import { createOptionalContext, useService } from "@/utils/providerish/serviceHooks"

import { type Clock, defaultClock } from "./Clock"
import { defaultSchedule, type Schedule } from "./schedule"
import { StatsStorage } from "./StatsStorage"

export interface GlobalDependencies {
  clock: Clock
  schedule: Schedule
  statsStorage: StatsStorage
}

export const GlobalDependenciesContext = createOptionalContext<GlobalDependencies>()

export const useGlobalDependencies = (): GlobalDependencies => useService(GlobalDependenciesContext)

export const useClock = (): Clock => useGlobalDependencies().clock

export const useSchedule = (): Schedule => useGlobalDependencies().schedule

export const useStatsStorage = (): StatsStorage => useGlobalDependencies().statsStorage

export const defaultGlobalDependencies: GlobalDependencies = {
  clock: defaultClock,
  schedule: defaultSchedule,
  statsStorage: new StatsStorage(window.localStorage),
}
