"use client";

import Link from "next/link";
import Card from "./Card";
import { useState, useEffect } from "react";
import { RestaurantItem, RestaurantJson } from "../../interface";

export default function RestaurantCatalogWithSearch({ restaurantJson }: { restaurantJson: RestaurantJson }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState<RestaurantItem[]>(restaurantJson.data);

    useEffect(() => {
        const filtered = restaurantJson.data.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
    }, [searchQuery, restaurantJson.data]);

    return (
        <div className="relative w-full">
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search"
                className="absolute right-6 mb-6 p-2 w-70 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Restaurant Grid */}
            <div className="grid justify-items-center grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5 p-5 pt-16 w-full">
                {filteredData.map((resItem: RestaurantItem) => (
                    <Link key={resItem._id} href={`restaurant/${resItem._id}`} className="w-[300px]">
                        <Card venueName={resItem.name} imgSrc={resItem.picture} />
                    </Link>
                ))}
            </div>
        </div>
    );
}
