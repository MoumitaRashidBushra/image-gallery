import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import ImageGallery from "../Components/ImageGallery/ImageGallery";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ImageGallery></ImageGallery>,
    },
]);

export default router;