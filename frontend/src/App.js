import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/scss/global.scss";
import "./assets/scss/reset.scss";

const Loading = lazy(() => import("./components/Loading/Loading"));

const AllEntries = lazy(() => import("./pages/AllEntries/AllEntries"));
const Layout = lazy(() => import("./components/Layout/Layout"));

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<Suspense fallback={<Loading />}>
							<Layout>
								<AllEntries />
							</Layout>
						</Suspense>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
