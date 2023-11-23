import { Body, Controller, Get, Post, Param, Put, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDtoValidate } from './interfaces/dto/book.dto.validate';
import { BookDocument } from './schemas/book.schema';
import { IdValidationPipe } from 'src/validations/id.validation.pipe';
import { DtoValidationPipe } from 'src/validations/dto.validation.pipe';

@Controller('book')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post() 
  async create(@Body(DtoValidationPipe) createBookDto: BookDtoValidate) {
    return await this.booksService.create(createBookDto);
  }

  @Get()
  async findAll(): Promise<BookDocument[]> {
    return await this.booksService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id', IdValidationPipe) id: string,
    @Body(DtoValidationPipe) updateBookDto: BookDtoValidate
  ): Promise <BookDocument> {
    return await this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  async delete(
    @Param('id', IdValidationPipe) id: string,
  ): Promise <BookDocument> {
    return await this.booksService.delete(id);
  }
}
