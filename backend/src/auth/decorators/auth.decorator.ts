import {UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";

export const OnlyAuthed = () => UseGuards(AuthGuard('jwt'))