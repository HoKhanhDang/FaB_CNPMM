import { Request, Response } from "express";
import layoutService from "./grid.service";
const GetLayout = async (req: Request, res: Response) => {
    const { page } = req.query;
    try {
        const result = await layoutService.GetLayoutService(page as string);
        return res.status(200).json({ result });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

const AddLayout = async (req: Request, res: Response) => {
    const { page, code, name, prompt } = req.body;
    try {
        const result = await layoutService.AddLayoutService({
            page,
            code,
            name,
            prompt,
        });
        return res.status(200).json({ result });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

const UpdateLayout = async (req: Request, res: Response) => {
    const layout_id = req.params.layout_id;
    const { code, name, prompt } = req.body;
    try {
        const result = await layoutService.UpdateLayoutService(layout_id, {
            code,
            name,
            prompt,
        });
        return res.status(200).json({ result });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

const DeleteLayout = async (req: Request, res: Response) => {
    const { layout_id } = req.params;
    try {
        const result = await layoutService.DeleteLayoutService(
            layout_id as string
        );
        return res.status(200).json({ result });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export default {
    GetLayout,
    AddLayout,
    UpdateLayout,
    DeleteLayout,
};
