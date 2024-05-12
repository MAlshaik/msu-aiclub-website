"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function MakePostButton() {
    return (
        <Button as={Link} href="/member/posts/new">
            Make post
        </Button>
    );
}