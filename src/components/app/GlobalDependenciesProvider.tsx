import { type ReactNode } from "react"

import { defaultSchedule, type Schedule } from "@/lib/schedule"
import { StatsStorage } from "@/lib/statsStorage/StatsStorage"
import { type Clock, defaultClock } from "@/utils/Clock"
import { createOptionalContext, useService } from "@/utils/providerish/serviceHooks"

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

interface GlobalDependenciesProviderProps {
  dependencies: GlobalDependencies
  children: ReactNode
}

export const GlobalDependenciesProvider = ({ dependencies, children }: GlobalDependenciesProviderProps) => (
  <GlobalDependenciesContext.Provider value={dependencies}>{children}</GlobalDependenciesContext.Provider>
)
