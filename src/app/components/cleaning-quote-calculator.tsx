'use client'

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';

const CleaningQuoteCalculator = () => {
  const [serviceType, setServiceType] = useState('move-in');
  const [area, setArea] = useState('');
  const [options, setOptions] = useState({
    window: false,
    kitchen: false,
    bathroom: false
  });
  const [floors, setFloors] = useState('1');

  const calculateQuote = () => {
    let basePrice = 0;
    const areaNum = parseFloat(area) || 0;

    // 기본 평당 가격 계산
    switch(serviceType) {
      case 'move-in':
        basePrice = areaNum * 15000;
        break;
      case 'move-out':
        basePrice = areaNum * 13000;
        break;
      case 'building':
        basePrice = areaNum * 20000;
        break;
      default:
        basePrice = 0;
    }

    // 추가 옵션 계산
    if (options.window) basePrice += areaNum * 2000;
    if (options.kitchen) basePrice += 50000;
    if (options.bathroom) basePrice += 30000;

    // 층수에 따른 할증
    if (floors > 1) {
      basePrice *= (1 + (parseInt(floors) - 1) * 0.1);
    }

    return Math.round(basePrice);
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold">청소 서비스 견적 계산기</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>서비스 종류</Label>
          <select 
            className="w-full p-2 border rounded"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
          >
            <option value="move-in">입주청소</option>
            <option value="move-out">이사청소</option>
            <option value="building">건물청소</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label>면적 (평)</Label>
          <Input
            type="number"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="평수를 입력하세요"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label>층수</Label>
          <Input
            type="number"
            value={floors}
            onChange={(e) => setFloors(e.target.value)}
            placeholder="층수를 입력하세요"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label>추가 옵션</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={options.window}
                onChange={(e) => setOptions({...options, window: e.target.checked})}
                className="w-4 h-4"
              />
              <span>창문 청소</span>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={options.kitchen}
                onChange={(e) => setOptions({...options, kitchen: e.target.checked})}
                className="w-4 h-4"
              />
              <span>주방 특수 청소</span>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={options.bathroom}
                onChange={(e) => setOptions({...options, bathroom: e.target.checked})}
                className="w-4 h-4"
              />
              <span>욕실 특수 청소</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="text-xl font-bold">
            예상 견적: {area ? calculateQuote().toLocaleString() : 0}원
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CleaningQuoteCalculator;