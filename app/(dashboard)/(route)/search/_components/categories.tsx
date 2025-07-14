"use client";

import { Category } from "@prisma/client";
import {
    FcEngineering,
    FcFilmReel,
    FcMultipleDevices,
    FcMusic,
    FcOldTimeCamera,
    FcSalesPerformance,
    FcSportsMode,
    FcBusinessman,
    FcReading,
    FcGlobe,
    FcTimeline,
    FcShop,
    FcLibrary,
} from "react-icons/fc";
// import { MdScience, MdDraw, MdLanguage } from "react-icons/md";
// import { FaPaintBrush, FaBrain } from "react-icons/fa";
import { IconType } from "react-icons";

import { CategoryItem } from "./category-item";

interface CategoriesProps {
    items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
    "Music": FcMusic,
    "Photography": FcOldTimeCamera,
    "Fitness": FcSportsMode,
    "Accounting": FcSalesPerformance,
    "Computer Science": FcMultipleDevices,
    "Filming": FcFilmReel,
    "Engineering": FcEngineering,
    "Business": FcBusinessman,
    "Reading": FcReading,
    "Geography": FcGlobe,
    "History": FcTimeline,
    "Marketing": FcShop,
    "Economics": FcLibrary,
    // "Science": MdScience,
    // "Drawing": MdDraw,
    // "Painting": FaPaintBrush,
    // "Psychology": FaBrain,
    // "Languages": MdLanguage,
};

export const Categories = ({
    items,
}: CategoriesProps) => {
    return (
        <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
            {items.map((item) => (
                <CategoryItem
                    key={item.id}
                    label={item.name}
                    icon={iconMap[item.name]}
                    value={item.id}
                />
            ))}
        </div>
    );
};
