import { Standing } from "@/shared/api";
import * as hooks from "@chakra-ui/color-mode";
import { Table, Tbody } from "@chakra-ui/react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { createStore, fork } from "effector";
import { Provider } from "effector-react/scope";
import { Standings } from "..";
import { StandingHeader } from "./StandingHeader";
import { StandingRow } from "./StandingRow";

describe("Standings works", () => {
  const standing: Standing = {
    description: "description",
    all: {
      draw: null,
      goals: {
        against: null,
        for: null,
      },
      lose: null,
      played: null,
      win: null,
    },
    home: {
      draw: 1,
      goals: {
        against: 1,
        for: 3,
      },
      lose: 0,
      played: 2,
      win: 1,
    },
    away: {
      draw: 1,
      goals: {
        against: 1,
        for: 3,
      },
      lose: 0,
      played: 2,
      win: 1,
    },
    form: "WDLLLL",
    goalsDiff: 2,
    group: "group",
    points: null,
    rank: 4,
    status: "status",
    team: {
      id: 1,
      logo: "https://images.unsplash.com/photo-1663044079975-76322ebf98af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
      name: "MU",
    },
    update: "update",
  };

  test("Renders StandingHeader", () => {
    render(
      <Table>
        <StandingHeader />
      </Table>
    );

    expect(screen.getByText("#")).toBeInTheDocument();
    expect(screen.getByText("G")).toBeInTheDocument();
    expect(screen.getByText("Form")).toBeInTheDocument();
  });

  test("Renders StandingRow with selected team", () => {
    render(
      <Table>
        <Tbody>
          <StandingRow standing={standing} isTeamSelected={true} />
        </Tbody>
      </Table>
    );

    const rankEl = screen.getByText("4.");
    const imageEl = screen.getByTestId("standing-row-image");
    const nameEl = screen.getByText("MU");
    const formWinEl = screen.getByText("W");
    const formDrawEl = screen.getByText("D");
    const formElements = screen.getAllByTestId("standing-row-form");

    expect(rankEl).toBeInTheDocument();
    expect(imageEl).toBeInTheDocument();
    expect(nameEl).toBeInTheDocument();
    expect(formWinEl).toBeInTheDocument();
    expect(formDrawEl).toBeInTheDocument();

    expect(formElements).toHaveLength(5);
  });

  test("Renders StandingRow with dark mode", () => {
    jest.spyOn(hooks, "useColorMode").mockImplementation(() => ({
      colorMode: "dark",
      toggleColorMode: jest.fn(),
      setColorMode: jest.fn(),
    }));

    const { container } = render(
      <Table>
        <Tbody>
          <StandingRow standing={standing} />
        </Tbody>
      </Table>
    );

    expect(container.querySelector("td")).toHaveStyle({
      "background-color": "#010a0f",
    });
  });

  test("Renders Standings with data", async () => {
    const $standings = createStore<Standing[]>([standing]);
    const scope = fork();

    render(
      <Provider value={scope}>
        <Standings loading={false} error="" store={$standings} />
      </Provider>
    );

    expect(screen.getByTestId("standings-table")).toBeInTheDocument();
    expect(screen.getByTestId("standings-help-text")).toBeInTheDocument();
  });

  test("Renders Standings with no data", () => {
    const $standings = createStore<Standing[]>([]);
    const scope = fork();

    render(
      <Provider value={scope}>
        <Standings loading={false} error="" store={$standings} />
      </Provider>
    );

    expect(screen.queryByTestId("standings-table")).not.toBeInTheDocument();
    expect(screen.getByTestId("standings-not-found")).toBeInTheDocument();
  });

  test("Renders Standings with error", () => {
    const $standings = createStore<Standing[]>([]);
    const error = "Error message!";
    const scope = fork();

    render(
      <Provider value={scope}>
        <Standings loading={false} error={error} store={$standings} />
      </Provider>
    );

    expect(screen.queryByTestId("standings-table")).not.toBeInTheDocument();
    expect(screen.getByText(error)).toBeInTheDocument();
  });

  test("Renders Standings when loading", () => {
    const $standings = createStore<Standing[]>([]);
    const scope = fork();

    render(
      <Provider value={scope}>
        <Standings loading={true} error={""} store={$standings} />
      </Provider>
    );

    expect(screen.queryByTestId("standings-table")).not.toBeInTheDocument();
    expect(screen.getByTestId("standings-loading")).toBeInTheDocument();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
