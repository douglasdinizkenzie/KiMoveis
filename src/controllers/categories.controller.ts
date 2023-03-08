import { Request, Response } from "express";
import {
  tCategory,
  tCategoryArray,
  tCreateCategory,
  tRealEstatePerCategory,
} from "../interfaces/categories.interface";
import { createCategoriesService } from "../services/categories/createCategories.service";
import { listAllCategoriesService } from "../services/categories/listAllCategories.service";
import { listRealEstatePerCategoryServce } from "../services/categories/listRealEstatePerCategory.service";

export const createCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data: tCreateCategory = req.body;
  const newCategory: tCategory = await createCategoriesService(data);
  return res.status(201).json(newCategory);
};

export const listAllCategoriesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categories: tCategoryArray = await listAllCategoriesService();
  return res.status(200).json(categories);
};

export const listRealEstatePerCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const idCategory: number = Number(req.params.id);
  const realEstates: tRealEstatePerCategory =
    await listRealEstatePerCategoryServce(idCategory);
  return res.status(200).json(realEstates);
};
