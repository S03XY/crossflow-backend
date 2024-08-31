import { Controller, Get, Query } from '@nestjs/common';
import { CheckDomainDto } from './dto/checkDomain';
import { RegisterService } from './register.service';

@Controller()
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Get('/check-domain')
  async checkDomain(@Query() data: CheckDomainDto) {
    return this.registerService.checkDomain(data);
  }
}
