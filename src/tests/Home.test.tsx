import * as React from "react";

import { Redirect } from 'react-router'
import { rootRoute } from '@/common/route'
import { shallow } from "enzyme";
import Home from "../pages/Home/page";

describe("<Home />", () => {
    it("should render without throwing an error", () => {
        expect(shallow(<Home />).contains(<Redirect to={rootRoute} />)).toBe(true);
    });
});