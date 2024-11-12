import Layout, { ILayout } from "./grid.model";

interface LayoutData {
    page: string;
    code: string;
    name: string;
    prompt: string;
}

const GetLayoutService = async (page: string) => {
    try {
        const result = await Layout.find({ page });

        return result;
    } catch (error) {
        throw new Error(`Error fetching layout: ${error}`);
    }
};

const AddLayoutService = async (data: LayoutData): Promise<ILayout> => {
    const { page, code, name, prompt } = data;
    try {
        const newLayout = new Layout({
            page,
            code,
            name,
            prompt,
        });
        const result = await newLayout.save();
        return result;
    } catch (error) {
        throw new Error(`Error adding layout: ${error}`);
    }
};

const UpdateLayoutService = async (
    layout_id: string,
    data: Partial<LayoutData>
): Promise<ILayout | null> => {
    try {
        const result = await Layout.findByIdAndUpdate(layout_id, data, {
            new: true, 
            upsert: true,
        });
        return result;
    } catch (error) {
        throw new Error(`Error updating layout: ${error}`);
    }
};

const DeleteLayoutService = async (
    layout_id: string
): Promise<ILayout | null> => {
    try {
        const result = await Layout.findByIdAndDelete(layout_id);
        return result;
    } catch (error) {
        throw new Error(`Error deleting layout: ${error}`);
    }
};

export default {
    GetLayoutService,
    AddLayoutService,
    UpdateLayoutService,
    DeleteLayoutService,
};
