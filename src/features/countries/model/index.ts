import {
  Country,
  GetCountriesResponse,
  GetLeaguesResponse,
  League,
  LeaguesQueryParams,
  rapidApi
} from "@/shared/api";
import {
  createEffect,
  createEvent,
  createStore,
  forward,
  sample
} from "effector-next";

export const countryButtonClicked = createEvent<string>();
export const sidebarLoaded = createEvent()

export const fetchCountriesFx = createEffect<
  void,
  GetCountriesResponse["response"],
  Error
>(async () => {
  const { response } = await rapidApi.countriesApi.getCountries();

  return response;
});
export const $countriesFetching = fetchCountriesFx.pending;

export const fetchCountryLeaguesFx = createEffect<
  LeaguesQueryParams,
  GetLeaguesResponse["response"],
  Error
>(async (params) => {
  const { response } = await rapidApi.leaguesApi.getLeagues(params);

  return response;
});

export const $countryLeaguesFetching = createStore<{
  code: string;
  loading: boolean;
} | null>(null);

export const $countryLeagues = createStore<{ code: string; leagues: League[] }[]>([]);

export const $countries = createStore<{ country: Country; loaded: boolean }[]>(
  []
).on(fetchCountriesFx.doneData, (_, countries) => {
  return countries.map((country) => ({ country, loaded: false }));
});

forward({
  from: sidebarLoaded,
  to: fetchCountriesFx
})

sample({
  clock: countryButtonClicked,
  source: $countries,
  filter: (countries, code) => {
    const country = countries.find((item) => item.country.code === code);
    if (!country || country.loaded === true) return false;

    return true;
  },
  fn: (_, code) => {
    return {code, loading: true}
  },
  target: $countryLeaguesFetching,
});

sample({
  clock: countryButtonClicked,
  source: $countries,
  filter: (countries, code) => {
    const country = countries.find((item) => item.country.code === code);
    if (!country || country.loaded === true) return false;

    return true;
  },
  fn: (_, code): LeaguesQueryParams => {
    return {
      code,
    };
  },
  target: fetchCountryLeaguesFx,
});

sample({
  clock: fetchCountryLeaguesFx.doneData,
  source: $countries,
  fn: (countries, data) => {
    const code = data[0]?.country.code;
    return countries.map(({ country, loaded }) => {
      if (country.code === code) {
        return { country, loaded: true };
      }

      return { country, loaded };
    });
  },
  target: $countries,
});

sample({
  clock: fetchCountryLeaguesFx.doneData,
  fn: (data) => {
    const code = data[0]?.country.code;
    return {
      code,
      loading: false,
    };
  },
  target: $countryLeaguesFetching,
});

sample({
  clock: fetchCountryLeaguesFx.doneData,
  source: $countryLeagues,
  fn: (countryLeagues, data) => {
    const code = data[0]?.country.code;
    const leagues = data.map(({ league }) => league);

    return [...countryLeagues, { code, leagues }];
  },
  target: $countryLeagues,
});
