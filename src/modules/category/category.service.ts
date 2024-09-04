import { HttpException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/serives/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}
  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  async findOne(id: number) {
    return this.prisma.category
      .findUnique({
        where: {
          category_id: id,
        },
      })
      .catch((error) => {
        if (error.code === 'P2025') {
          throw new HttpException('Category not found', 404);
        }
        throw new HttpException('Internal Server Error', 500);
      });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category
      .update({
        where: {
          category_id: id,
        },
        data: updateCategoryDto,
      })
      .catch((error) => {
        if (error.code === 'P2025') {
          throw new HttpException('Category not found', 404);
        }
        throw new HttpException('Internal Server Error', 500);
      });
  }

  async remove(id: number) {
    console.log(id);
    if (id == 1) throw new HttpException('You can not delete this post', 403);
    return this.prisma.category
      .delete({ where: { category_id: id } })
      .catch((error) => {
        if (error.code === 'P2025') {
          throw new HttpException('Category not found', 404);
        }
        throw new HttpException('Internal Server Error', 500);
      });
  }
}
