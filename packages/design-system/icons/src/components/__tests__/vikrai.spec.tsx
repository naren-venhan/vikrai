  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import vikrai from "../vikrai"

  describe("vikrai", () => {
    it("should render the icon without errors", async () => {
      render(<vikrai data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })
