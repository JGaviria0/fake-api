import { HttpException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/serives/prisma.service';

@Injectable()
export class CategoryService {
  masterUser = 28;
  constructor(private prisma: PrismaService) {}
  create(createCategoryDto: CreateCategoryDto, user_id: number) {
    return this.prisma.category.create({
      data: {
        ...createCategoryDto,
        user: {
          connect: {
            id: user_id,
          },
        },
      },
    });
  }

  findAll(user_id: number) {
    return this.prisma.category.findMany({
      where: {
        user: {
          id: {
            in: [user_id, this.masterUser],
          },
        },
      },
    });
  }

  async findOne(id: number, user_id: number) {
    return this.prisma.category
      .findUnique({
        where: {
          category_id: id,
          user: {
            id: {
              in: [user_id, this.masterUser],
            },
          },
        },
      })
      .catch((error) => {
        if (error.code === 'P2025') {
          throw new HttpException('Category not found', 404);
        }
        throw new HttpException('Internal Server Error', 500);
      });
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
    user_id: number,
  ) {
    return this.prisma.category
      .update({
        where: {
          category_id: id,
          user: {
            id: user_id,
          },
        },
        data: updateCategoryDto,
      })
      .catch((error) => {
        if (error.code === 'P2025') {
          throw new HttpException('Category not found in your user', 404);
        }
        throw new HttpException('Internal Server Error', 500);
      });
  }

  async remove(id: number, user_id: number) {
    if (id == 1)
      throw new HttpException('You can not delete this category', 403);
    return this.prisma.category
      .delete({
        where: {
          category_id: id,
          user: {
            id: user_id,
          },
        },
      })
      .catch((error) => {
        if (error.code === 'P2025') {
          throw new HttpException('Category not found in your user', 404);
        }
        if (error.code === 'P2003') {
          throw new HttpException(
            'You can not delete this category, if product is using it, please delete or update the product',
            403,
          );
        }
        throw new HttpException('Internal Server Error', 500);
      });
  }
}
